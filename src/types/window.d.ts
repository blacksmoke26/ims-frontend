// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import type ApiClient from '~/clients/ApiClient.ts';

declare global {
  var apiClient: InstanceType<typeof ApiClient>;
}

export {};
