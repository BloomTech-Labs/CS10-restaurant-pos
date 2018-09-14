import permissions from './permissions.json';

export const requireManager = store => next => action => {
  if (store.getState().auth.role !== 'manager') {
    if (permissions.manager.includes(action.type)) {
      store.dispatch({ type: 'PERMISSIONS_ERROR', payload: action });
    } else {
      next(action);
    }
  }
};

export const requireAdmin = store => next => action => {
  if (store.getState().auth.role === 'admin') {
    if (permissions.admin.includes(action.type)) {
      store.dispatch({ type: 'PERMISSIONS_ERROR', payload: action });
    } else {
      next(action);
    }
  }
};
