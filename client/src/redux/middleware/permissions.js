import { config } from './permissionsConfig';

export const requireManager = (store) => (next) => (action) => {
  if (store.getState().auth.role !== 'manager') {
    if (config.manager.includes(action.type)) {
      store.dispatch({ type: 'PERMISSIONS_ERROR', payload: action });
    } else {
      next(action);
    }
  } else {
    next(action);
  }
};

export const requireAdmin = (store) => (next) => (action) => {
  if (store.getState().auth.role !== 'admin') {
    if (config.admin.includes(action.type)) {
      store.dispatch({ type: 'PERMISSIONS_ERROR', payload: action });
    } else {
      next(action);
    }
  } else {
    next(action);
  }
};
