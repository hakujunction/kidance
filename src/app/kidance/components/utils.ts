export function prepareProgress (progress: number) {
    if (progress === 0) {
      return 20
    }
    if (progress < 21) {
      return progress * 2;
    }
    if (progress < 41) {
      return progress * 1.7;
    }
    if (progress < 61) {
      return progress * 1.3;
    }
    if (progress < 81) {
      return progress * 1.15;
    }
    return progress;
  }