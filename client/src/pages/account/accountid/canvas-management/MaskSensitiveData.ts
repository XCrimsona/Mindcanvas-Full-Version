//Hides/Masks sensitive workspace data
//PrimaryControlsAndDetails uses this to mask sensitive canva space basic data
export const useMaskSensitiveData = () => {
  const maskSensitiveData = (text: string) => "*".repeat(text.length);
  return { maskSensitiveData };
};
