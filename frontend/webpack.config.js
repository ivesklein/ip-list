import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import dotenv from 'dotenv';

// load environment variables
dotenv.config();

// check environment variables
if (!process.env.API_URL) {
    throw new Error('API_URL environment variable is missing');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry : './src/index.js',
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'dist'),
    },
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            API_URL: JSON.stringify(process.env.API_URL),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
} 