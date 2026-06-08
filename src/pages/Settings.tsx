import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { FileUpload } from '../components/ui/FileUpload';
import { updateUser } from '../api';
import { UserRole } from '../types';

export const SettingsPage = () => {
  const { currentUser, setCurrentUser, addToast } = useAppStore();
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [imageUrl, setImageUrl] = useState(currentUser?.image || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingPicture, setIsEditingPicture] = useState(false);


  if (!currentUser) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Please login to manage your settings.</p>
      </div>
    );
  }

  const handleProfilePicChange = (base64Url: string) => {
    setImageUrl(base64Url || currentUser.image);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName.trim()) {
      addToast('First name is required', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const updatedData = {
        ...currentUser,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim() || currentUser.username,
        image: imageUrl || currentUser.image,
      };

      
      await updateUser(updatedData);

      localStorage.setItem('currentUser', JSON.stringify(updatedData));
      setCurrentUser(updatedData);

      addToast('Profile settings updated successfully!', 'success');
      
  
      setIsEditingPicture(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      addToast('Failed to save settings. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Account Settings</h1>
        <p className="text-sm text-gray-500">Update your profile information and customize your experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Picture Visualizer / Upload */}
        <div className="lg:col-span-1 flex flex-col items-center">
          <div className="w-full backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-md flex flex-col items-center text-center">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Profile Photo</h3>
            
            {!isEditingPicture ? (
              // CASE 1: Standard display view of the photo with "Edit Photo" button below it
              <div className="flex flex-col items-center animate-fade-in w-full">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg bg-gray-50 mb-4 flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Current avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-black text-gray-400">
                      {firstName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsEditingPicture(true)}
                  className="px-4 py-2 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-all shadow-sm hover:text-black hover:border-gray-400"
                >
                  Change Photo
                </button>
              </div>
            ) : (
              // CASE 2: Upload Zone when user clicks "Change Photo"
              <div className="w-full animate-fade-in">
                {/* Upload Area */}
                <FileUpload
                  onFileSelect={handleProfilePicChange}
                  initialPreviewUrl={imageUrl}
                  maxSizeMB={2}
                  className="w-full"
                />
                
                <div className="flex gap-2 justify-center mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      // Reset to the current user's profile image and close upload area
                      setImageUrl(currentUser.image);
                      setIsEditingPicture(false);
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                
                <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
                  Click to browse or drag and drop. 2MB maximum file size.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Personal Information Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Personal Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-gray-700 uppercase">
                  First Name *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-black transition-colors"
                  placeholder="First name"
                  disabled={isSaving}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-gray-700 uppercase">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-black transition-colors"
                  placeholder="Last name"
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-gray-700 uppercase">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-black transition-colors"
                  placeholder="username"
                  disabled={isSaving}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-gray-700 uppercase">
                  Email Address (Non-editable)
                </label>
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-400 cursor-not-allowed outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest text-gray-700 uppercase">
                System Role
              </label>
              <span className="inline-flex w-fit px-3 py-1 text-xs font-bold text-white bg-black rounded-full shadow-sm capitalize">
                {currentUser.role.replace('_', ' ')}
              </span>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 active:scale-95 shadow-md shadow-black/10"
              >
                {isSaving ? 'Saving Changes...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
