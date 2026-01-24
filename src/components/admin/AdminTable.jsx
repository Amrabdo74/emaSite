import { useTranslation } from 'react-i18next';
import { FaEye, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';

export default function AdminTable({ 
  columns, 
  data, 
  isLoading, 
  onView, 
  onEdit, 
  onDelete,
  actions = true,
  emptyMessage
}) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-lg">
          {emptyMessage || (isArabic ? 'لا توجد بيانات' : 'No data available')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" dir={isArabic ? 'rtl' : 'ltr'}>
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className={`px-6 py-4 text-sm font-semibold text-primary ${isArabic ? 'text-right' : 'text-left'}`}
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className={`px-6 py-4 text-sm font-semibold text-primary ${isArabic ? 'text-right' : 'text-left'}`}>
                  {isArabic ? 'الإجراءات' : 'Actions'}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item, rowIndex) => (
              <tr key={item.id || rowIndex} className="hover:bg-gray-50/50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm text-gray-600">
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {onView && (
                        <button 
                          onClick={() => onView(item)}
                          className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                          title={isArabic ? 'عرض' : 'View'}
                        >
                          <FaEye />
                        </button>
                      )}
                      {onEdit && (
                        <button 
                          onClick={() => onEdit(item)}
                          className="p-2 text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                          title={isArabic ? 'تعديل' : 'Edit'}
                        >
                          <FaEdit />
                        </button>
                      )}
                      {onDelete && (
                         <button 
                          onClick={() => onDelete(item)}
                          className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          title={isArabic ? 'حذف' : 'Delete'}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
