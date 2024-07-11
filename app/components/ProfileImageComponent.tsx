import React, { createContext, useState, useContext } from 'react';

type ProfileImageContextType = {
    profileImage: string;
    setProfileImage: (profileImage: string) => void;
};

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(undefined);

export function ProfileImageProvider({ children }: { children: React.ReactNode }) {
    const [profileImage, setProfileImage] = useState<string>("");
  
    return (
      <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
        {children}
      </ProfileImageContext.Provider>
    );
}
  
export function useProfileImageContext() {
  const context = useContext(ProfileImageContext);
  if (context === undefined) {
    throw new Error('useProfileImageContext must be used within an ProfileImageProvider');
  }
  return context;
}  