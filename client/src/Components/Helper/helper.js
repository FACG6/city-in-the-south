const handleStatusColor = status => {
  switch (status) {
    case 'completed':
    case 'accepted':
      return status;
    case 'pending':
      return status;
    case 'finished':
    case 'refused':
      return status;
    case 'active':
      return status;
    default:
      return null;
  }
};

export default handleStatusColor;
