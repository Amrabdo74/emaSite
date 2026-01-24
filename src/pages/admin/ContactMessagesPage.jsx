import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminTable from '../../components/admin/AdminTable';
import DetailsModal from '../../components/admin/DetailsModal';
import { useTranslation } from 'react-i18next';

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const q = query(
        collection(db, 'contactMessages'), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to Date
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date(doc.data().createdAt)
      }));
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: isArabic ? 'الاسم' : 'Name', key: 'name' },
    { header: isArabic ? 'البريد الإلكتروني' : 'Email', key: 'email' },
    { header: isArabic ? 'رقم الهاتف' : 'Phone', key: 'phone' },
    { 
      header: isArabic ? 'التاريخ' : 'Date', 
      key: 'createdAt',
      render: (item) => item.createdAt.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US') + ' ' + item.createdAt.toLocaleTimeString(isArabic ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ];

  const modalFields = [
    { label: isArabic ? 'الاسم' : 'Name', key: 'name' },
    { label: isArabic ? 'البريد الإلكتروني' : 'Email', key: 'email' },
    { label: isArabic ? 'رقم الهاتف' : 'Phone', key: 'phone' },
    { label: isArabic ? 'الرسالة' : 'Message', key: 'message' },
    { 
      label: isArabic ? 'التاريخ' : 'Date', 
      key: 'createdAt',
      render: (item) => item.createdAt.toLocaleString(isArabic ? 'ar-EG' : 'en-US')
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">
        {isArabic ? 'رسائل تواصل معنا' : 'Contact Messages'}
      </h1>

      <AdminTable
        columns={columns}
        data={messages}
        isLoading={loading}
        onView={setSelectedMessage}
        // No edit/delete for now as per requirements, but easy to add
      />

      <DetailsModal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title={isArabic ? 'تفاصل الرسالة' : 'Message Details'}
        data={selectedMessage || {}}
        fields={modalFields}
      />
    </div>
  );
}
