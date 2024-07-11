import { ApiKeyPrompt } from '../components/popups/apiKeyPopup.js';
import storage from './storage.js';

function apiKeyCheck() {
  const apiKey = storage.get('apiKey') || '';

  if (apiKey === '') {
    new ApiKeyPrompt();
    return false;
  } else {
    return true;
  }
}

export default apiKeyCheck;