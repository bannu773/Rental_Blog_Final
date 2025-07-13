"use client";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './profilePage.module.css';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', image: '' });
  const [saving, setSaving] = useState(false);
  const [userStats, setUserStats] = useState({ posts: 0, views: 0 });
  const [mounted, setMounted] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Component mounted state for smooth animations
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user && user.email) {
      fetchProfile();
      fetchUserStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/profile?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setProfile(data);
        setEditData({ name: data.name || '', image: data.image || '' });
        setImagePreview(data.image || null);
      }
    } catch (err) {
      setError('Failed to fetch profile.');
    }
  };

  const fetchUserStats = async () => {
    try {
      const statsRes = await fetch(`/api/profile/stats?email=${encodeURIComponent(user.email)}`);
      const statsData = await statsRes.json();
      
      if (statsData.error) {
        console.error('Error fetching stats:', statsData.error);
        setUserStats({ posts: 0, views: 0 });
      } else {
        setUserStats({
          posts: statsData.posts,
          views: statsData.views
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setUserStats({ posts: 0, views: 0 });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP).');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB.');
      return;
    }

    setUploadingImage(true);
    setError(null);

    try {
      const base64 = await convertToBase64(file);
      setEditData(prev => ({ ...prev, image: base64 }));
      setImagePreview(base64);
    } catch (err) {
      setError('Failed to process image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setEditData(prev => ({ ...prev, image: '' }));
    setImagePreview(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: editData.name,
          image: editData.image,
        }),
      });

      if (!res.ok) throw new Error('Failed to update profile');
      
      const updatedProfile = await res.json();
      setProfile(updatedProfile);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({ name: profile.name || '', image: profile.image || '' });
    setImagePreview(profile.image || null);
    setIsEditing(false);
    setError(null);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatJoinDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  if (isLoading || !mounted) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingText}>Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.notAuthenticated}>
          <h2>✨ Access Your Profile</h2>
          <p>Please sign in to view and manage your personal profile.</p>
          <Link href="/login" className={styles.loginPrompt}>
            🚀 Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <div className={styles.error}>
            <h3>⚠️ Something went wrong</h3>
            <p>{error}</p>
            <button onClick={fetchProfile} className={styles.editButton}>
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingText}>Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          {/* Enhanced Header with Dynamic Background */}
          <div className={styles.header}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                {profile.image ? (
                  <img 
                    src={profile.image} 
                    alt={`${profile.name}'s profile`}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {getInitials(profile.name)}
                  </div>
                )}
                <div className={styles.statusBadge} title="Active user"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className={styles.content}>
            {error && (
              <div className={styles.error}>
                ⚠️ {error}
              </div>
            )}

            <div className={styles.nameSection}>
              <h1 className={styles.name}>
                {profile.name || 'Welcome, User!'}
              </h1>
              <p className={styles.email}>{profile.email}</p>
              {profile.createdAt && (
                <p className={styles.joinDate}>
                  ✨ Member since {formatJoinDate(profile.createdAt)}
                </p>
              )}
            </div>

            <div className={styles.actionSection}>
              {!isEditing ? (
                <button 
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit profile"
                >
                  <span>✏️</span>
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="fullName">
                      👤 Full Name
                    </label>
                    <div className={styles.inputContainer}>
                      <input
                        id="fullName"
                        type="text"
                        className={styles.input}
                        value={editData.name}
                        onChange={(e) => setEditData({ name: e.target.value })}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your full name"
                        disabled={saving}
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="profileImage">
                      🖼️ Profile Image
                    </label>
                    <div className={styles.imageUploadContainer}>
                      {imagePreview ? (
                        <div className={styles.imagePreview}>
                          <img src={imagePreview} alt="Profile preview" className={styles.previewImage} />
                          <button 
                            className={styles.removeImageButton}
                            onClick={removeImage}
                            disabled={uploadingImage}
                            aria-label="Remove image"
                          >
                            <span>❌</span>
                          </button>
                        </div>
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <span>No image uploaded</span>
                        </div>
                      )}
                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        className={styles.fileInput}
                        onChange={handleImageUpload}
                        disabled={saving}
                      />
                      {uploadingImage && <span className={styles.uploadingText}>Uploading image...</span>}
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button 
                      className={styles.saveButton}
                      onClick={handleSave}
                      disabled={saving || !editData.name.trim()}
                      aria-label="Save changes"
                    >
                      {saving ? (
                        <>
                          <span>⏳</span>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <span>💾</span>
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                    <button 
                      className={styles.cancelButton}
                      onClick={handleCancel}
                      disabled={saving}
                      aria-label="Cancel editing"
                    >
                      <span>❌</span>
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Stats Section with Icons */}
          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📝</div>
              <div className={styles.statNumber}>{userStats.posts}</div>
              <div className={styles.statLabel}>Posts Published</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>👁️</div>
              <div className={styles.statNumber}>{userStats.views}</div>
              <div className={styles.statLabel}>Profile Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}