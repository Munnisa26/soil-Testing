import React, { useEffect, useState } from 'react';
import { getContactMessages, markMessageRead } from '../../services/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    getContactMessages()
      .then((res) => setMessages(res.data.messages || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await markMessageRead(id);
    load();
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>;

  return (
    <div>
      <h2 className="mb-4">Contact Messages</h2>
      {messages.length === 0 ? (
        <div className="card-custom p-5 text-center text-muted">No messages</div>
      ) : (
        messages.map((m) => (
          <div key={m.id} className={`card-custom p-3 mb-2 ${!m.is_read ? 'border-start border-3 border-primary' : ''}`}>
            <div className="d-flex justify-content-between">
              <strong>{m.name}</strong>
              <small className="text-muted">{new Date(m.created_at).toLocaleString()}</small>
            </div>
            <div className="small text-muted">{m.email} · {m.subject || 'General'}</div>
            <p className="mb-2 mt-2">{m.message}</p>
            {!m.is_read && (
              <button className="btn btn-sm btn-outline-primary" onClick={() => markRead(m.id)}>Mark as read</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminMessages;
