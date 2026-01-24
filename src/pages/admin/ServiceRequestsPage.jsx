import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminTable from '../../components/admin/AdminTable';
import DetailsModal from '../../components/admin/DetailsModal';
import { useTranslation } from 'react-i18next';

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const q = query(
        collection(db, 'serviceRequests'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date(doc.data().createdAt)
      }));
      setRequests(data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: isArabic ? 'الاسم' : 'Name', key: 'name' },
    { header: isArabic ? 'الخدمة' : 'Service', key: 'service' },
    { header: isArabic ? 'البريد الإلكتروني' : 'Email', key: 'email' },
    { header: isArabic ? 'رقم الهاتف' : 'Phone', key: 'phone' },
    { 
      header: isArabic ? 'التاريخ' : 'Date', 
      key: 'createdAt',
      render: (item) => item.createdAt.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')
    }
  ];

  const modalFields = [
    { label: isArabic ? 'الاسم' : 'Name', key: 'name' },
    { label: isArabic ? 'البريد الإلكتروني' : 'Email', key: 'email' },
    { label: isArabic ? 'رقم الهاتف' : 'Phone', key: 'phone' },
    { label: isArabic ? 'نوع الخدمة' : 'Service Type', key: 'service' },
    { label: isArabic ? 'تفاصيل الطلب' : 'Request Details', key: 'message' },
    { 
      label: isArabic ? 'التاريخ' : 'Date', 
      key: 'createdAt',
      render: (item) => item.createdAt.toLocaleString(isArabic ? 'ar-EG' : 'en-US')
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">
        {isArabic ? 'طلبات الخدمات' : 'Service Requests'}
      </h1>

      <AdminTable
        columns={columns}
        data={requests}
        isLoading={loading}
        onView={setSelectedRequest}
      />

      <DetailsModal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        title={isArabic ? 'تفاصيل الطلب' : 'Request Details'}
        data={selectedRequest || {}}
        fields={modalFields}
      />
    </div>
  );
}
