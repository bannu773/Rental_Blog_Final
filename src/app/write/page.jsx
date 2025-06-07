"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useAuth0 } from '@auth0/auth0-react';
import { uploadToS3 } from "@/utils/s3";
// import ReactQuill from "react-quill";
import LoadingState from "@/components/LoadingState/LoadingState";

import dynamic from "next/dynamic";
import { Select, Upload, message, Image as AntdImage } from "antd";
import { PlusOutlined, PictureOutlined, LinkOutlined, VideoCameraOutlined } from '@ant-design/icons';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const WritePage = () => {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth0();
  const router = useRouter();

  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState(null);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      setCatLoading(true);
      setCatError(null);
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setCatError("Could not load categories");
      } finally {
        setCatLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (authLoading) {
    return <LoadingState isLoading={true} />;
  }

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      setSelectedFile(newFileList[0].originFileObj);
    } else {
      setSelectedFile(null);
      setMedia("");
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSubmit = async () => {
    setSubmitting(true);
    let uploadedMedia = media;
    try {
      // Only upload if a file is selected and not already uploaded
      if (selectedFile && !fileList[0]?.response?.url) {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        uploadedMedia = data.url;
        setMedia(data.url);
        // Update fileList with uploaded url for preview
        setFileList(prevList => prevList.map(f => ({ ...f, status: 'done', url: data.url, response: { url: data.url } })));
        setUploading(false);
      } else if (fileList[0]?.response?.url) {
        uploadedMedia = fileList[0].response.url;
      }
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc: value,
          img: uploadedMedia,
          slug: slugify(title),
          catSlug: catSlug || "style",
          userEmail: user.email
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Category Select */}
      {catLoading ? (
        <div style={{marginBottom: '2rem', color: '#AD1E24', fontWeight: 500}}>Loading categories...</div>
      ) : catError ? (
        <div style={{marginBottom: '2rem', color: '#AD1E24', fontWeight: 500}}>{catError}</div>
      ) : (
        <Select
          placeholder="Select a category"
          value={catSlug || undefined}
          onChange={setCatSlug}
          style={{ width: '100%', maxWidth: 300, marginBottom: '1rem' }}
          size="large"
          options={categories.map(cat => ({
            value: cat.slug,
            label: cat.title
          }))}
        />
      )}
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
        accept="image/*"
        showUploadList={{
          showPreviewIcon: true,
          showRemoveIcon: true,
          showDownloadIcon: false
        }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <AntdImage
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      <div className={styles.editor}>
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      <button 
        className={styles.publish} 
        onClick={handleSubmit}
        disabled={submitting || uploading}
      >
        {submitting ? "Publishing..." : uploading ? "Uploading..." : "Publish"}
      </button>
    </div>
  );
};

export default WritePage;
