import React, { useEffect, useState } from 'react';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../../services/api';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    getNotifications()
      .then((res) => setList(res.data.notifications || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await markNotificationRead(id);
    load();
  };

  const markAll = async () => {
    await markAllNotificationsRead();
    toast.success('All marked as read');
    load();
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Notifications</h2>
        {list.some((n) => !n.is_read) && (
          <button className="btn btn-sm btn-outline-custom" onClick={markAll}>Mark all as read</button>
        )}
      </div>
      {list.length === 0 ? (
        <div className="card-custom p-5 text-center text-muted">No notifications</div>
      ) : (
        list.map((n) => (
          <div
            key={n.id}
            className={`card-custom p-3 mb-2 ${!n.is_read ? 'border-start border-3 border-success' : ''}`}
            style={{ cursor: n.is_read ? 'default' : 'pointer' }}
            onClick={() => !n.is_read && markRead(n.id)}
          >
            <div className="d-flex justify-content-between">
              <strong>{n.title}</strong>
              <small className="text-muted">{new Date(n.created_at).toLocaleString()}</small>
            </div>
            <p className="mb-0 text-muted small">{n.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
