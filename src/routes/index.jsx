import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import ServicesPage from '../pages/ServicesPage';
import CareersPage from '../pages/CareersPage';
import JobDetailsPage from '../pages/JobDetailsPage';
import ApplyJobPage from '../pages/ApplyJobPage';
import NotFoundPage from '../pages/NotFoundPage';

// Admin Imports
import LoginPage from '../pages/admin/LoginPage';
import FavoriteApplicationsPage from '../pages/admin/FavoriteApplicationsPage';
import EmployeesPage from '../pages/admin/EmployeesPage';
import CreateEmployeePage from '../pages/admin/CreateEmployeePage';
import ContactMessagesPage from '../pages/admin/ContactMessagesPage';
import ServiceRequestsPage from '../pages/admin/ServiceRequestsPage';
import JobApplicationsPage from '../pages/admin/JobApplicationsPage';
import JobsPage from '../pages/admin/JobsPage';
import CreateJobPage from '../pages/admin/CreateJobPage';
import EditJobPage from '../pages/admin/EditJobPage';
import ProjectsPage from '../pages/admin/ProjectsPage';
import CreateProjectPage from '../pages/admin/CreateProjectPage';
import EditProjectPage from '../pages/admin/EditProjectPage';
import ProjectDetailsPage from '../pages/admin/ProjectDetailsPage';
import SettingsPage from '../pages/admin/SettingsPage';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/admin/ProtectedRoute';

export const router = createBrowserRouter([
  // Admin Routes
  {
    path: '/admin/login',
    element: <LoginPage />
  },
  {
    path: '/admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { 
        index: true, 
        element: <Navigate to="contact-messages" replace /> 
      },
      { 
        path: 'contact-messages', 
        element: <ContactMessagesPage /> 
      },
      { 
        path: 'service-requests', 
        element: <ServiceRequestsPage /> 
      },
      { 
        path: 'job-applications', 
        element: <JobApplicationsPage /> 
      },
      { 
        path: 'jobs', 
        element: <JobsPage /> 
      },
      { 
        path: 'jobs/create', 
        element: <CreateJobPage /> 
      },
      { 
        path: 'jobs/edit/:id', 
        element: <EditJobPage /> 
      },
      { 
        path: 'projects', 
        element: <ProjectsPage /> 
      },
      { 
        path: 'projects/create', 
        element: <CreateProjectPage /> 
      },
      { 
        path: 'projects/edit/:id', 
        element: <EditProjectPage /> 
      },
      { 
        path: 'projects/:id', 
        element: <ProjectDetailsPage /> 
      },
      { 
        path: 'favorites', 
        element: <FavoriteApplicationsPage /> 
      },
      { 
        path: 'employees', 
        element: <EmployeesPage /> 
      },
      { 
        path: 'employees/create', 
        element: <CreateEmployeePage /> 
      },
      { 
        path: 'settings', 
        element: <SettingsPage /> 
      },
    ]
  },

  // Public Routes
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'careers',
        element: <CareersPage />,
      },
      {
        path: 'careers/:id',
        element: <JobDetailsPage />,
      },
      {
        path: 'careers/:id/apply',
        element: <ApplyJobPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
