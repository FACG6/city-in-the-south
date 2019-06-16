const handleStatusColor = status => {
  console.log('ttttttttttt');
  switch (status) {
    case 'completed':
    case 'accepted':
      return '#0A8F07';
    case 'pending':
      return '#F77D0E';
    case 'finished':
    case 'refused':
      return 'red';
    case 'inactive':
      return '#1BA7E2';
    default:
      return null;
  }
};

export default handleStatusColor;
