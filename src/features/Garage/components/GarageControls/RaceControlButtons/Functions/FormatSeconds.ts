function formatSeconds(ms: number): number {
  const msToSec: number = 1000;
  return parseFloat((ms / msToSec).toFixed(1));
}

export default formatSeconds;
