// import path from 'path';
import { config } from 'dotenv';

// setting environment variables
config({ path: '.env' });
if (!process.env.NODE_ENV || process.env.NODE_ENV == 'production') {
    config({ path: '.env-production' });
}

