// Секретные данные для квеста
export const secretData = {
  file_type: "CLASSIFIED",
  security_level: "TOP_SECRET",
  content: "CONGRATULATIONS! You have found the secret file. This file contains classified information about the Syndicate's operations. Your access level has been elevated. New commands and features are now available. The secret code is: REDWOLF-2024-ENHANCED",
  coordinates: "40.7128° N, 74.0060° W",
  timestamp: "2024-01-15T12:00:00Z",
  author: "SYNDICATE_CORE",
  encryption: "AES-256",
  checksum: "a1b2c3d4e5f6",
  next_target: "Look for files with 'omega' in the name",
  hidden_message: "The real treasure is in the journey, not the destination. Keep exploring the system for more secrets."
};

export const getSecretContent = () => {
  return JSON.stringify(secretData, null, 2);
}; 