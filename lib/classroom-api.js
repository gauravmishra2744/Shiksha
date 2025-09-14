const API_BASE = '/api/classrooms';

export const classroomAPI = {
  // Get all classrooms
  getAll: async () => {
    const response = await fetch(API_BASE);
    return response.json();
  },

  // Create new classroom
  create: async (data) => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Activate classroom
  activate: async (id) => {
    const response = await fetch(`${API_BASE}/${id}/activate`, {
      method: 'POST',
    });
    return response.json();
  },

  // Deactivate classroom
  deactivate: async (id) => {
    const response = await fetch(`${API_BASE}/${id}/activate`, {
      method: 'DELETE',
    });
    return response.json();
  },
};