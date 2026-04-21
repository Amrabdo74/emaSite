import { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

// Helper: normalize a field to always be an array of non-empty strings
const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  if (typeof val === 'string' && val.trim()) return [val.trim()];
  return [];
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    email: 'EMA.info.2025@gmail.com',
    phones: ['+971545122841'],
    fax: '01021798849',
    whatsappNumbers: [{ number: '971545122841', url: 'https://wa.me/971545122841' }],
    location: { ar: 'المملكة العربية السعودية، جدة، الرياض', en: 'Saudi Arabia, Jeddah, Riyadh' },
    locationMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.123456789!2d39.1825!3d21.4858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b118db!2sJeddah%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
    facebook: 'https://www.facebook.com/profile.php?id=61584355047513',
    instagram: 'https://www.instagram.com/eam.info.tech/',
    twitter: '',
    linkedin: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'settings', 'global');

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();

        // --- Backward compatibility ---
        // If old single `phone` string exists, migrate to phones array
        let phones = toArray(data.phones);
        if (phones.length === 0 && data.phone) phones = toArray(data.phone);

        // If old single `whatsapp` URL exists, migrate to whatsappNumbers array
        let whatsappNumbers = Array.isArray(data.whatsappNumbers) ? data.whatsappNumbers : [];
        if (whatsappNumbers.length === 0 && data.whatsapp) {
          const match = data.whatsapp.match(/wa\.me\/(\+?\d+)/);
          const num = match ? match[1].replace('+', '') : data.whatsapp.replace(/\D/g, '');
          if (num) whatsappNumbers = [{ number: num, url: `https://wa.me/${num}` }];
        }

        setSettings(prev => ({
          ...prev,
          ...data,
          phones,
          whatsappNumbers,
          location: data.location || prev.location,
        }));
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching global settings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};
