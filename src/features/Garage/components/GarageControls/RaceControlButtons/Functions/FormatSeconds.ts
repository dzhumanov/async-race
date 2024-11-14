function formatSeconds(ms: number): number {
  return parseFloat((ms / 1000).toFixed(1));
}

export default formatSeconds;
