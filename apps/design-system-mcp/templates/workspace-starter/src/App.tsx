import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MenuProvider } from './contexts/MenuContext';
import { PageHeaderProvider } from './contexts/PageHeaderContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AppLayout } from './components/AppLayout';
import { DashboardPage } from './routes/DashboardPage';
import { ItemsPage } from './routes/ItemsPage';
import { ItemDetailPage } from './routes/ItemDetailPage';
import { SearchPage } from './routes/SearchPage';
import { NotificationsPage } from './routes/NotificationsPage';
import { SettingsPage } from './routes/SettingsPage';
import '@abgov/web-components/index.css';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <MenuProvider>
        <PageHeaderProvider>
          <NotificationProvider>
            <AppLayout>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<DashboardPage />} />

                {/* Items - customize these routes for your domain */}
                <Route path="/my-items" element={<ItemsPage myItemsOnly />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/items/:itemId" element={<ItemDetailPage />} />

                {/* Common workspace pages */}
                <Route path="/search" element={<SearchPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppLayout>
          </NotificationProvider>
        </PageHeaderProvider>
      </MenuProvider>
    </BrowserRouter>
  );
}
