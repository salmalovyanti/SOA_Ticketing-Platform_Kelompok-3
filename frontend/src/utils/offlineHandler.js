export const saveOrderOffline = (order) => {
    const orders = JSON.parse(localStorage.getItem('offlineOrders')) || [];
    orders.push(order);
    localStorage.setItem('offlineOrders', JSON.stringify(orders));
  };
  
  export const getOfflineData = () => {
    return JSON.parse(localStorage.getItem('offlineOrders')) || [];
  };
  