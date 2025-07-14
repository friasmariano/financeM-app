
export const getSizeClass: any = (size: ModalSize = 'medium') => {
  switch (size) {
    case 'small':
      return '25vw';
    case 'medium':
      return '45vw';
    case 'large':
      return '70vw';
    case 'full':
      return '90vw';
    default:
      return '50vw';
  }
};