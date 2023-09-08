import * as dotenv from "dotenv"
import * as path from 'path';
import * as Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const envVarsSchema = Joi.object().keys({
    ENV: Joi.string().required().valid('production', 'development', 'staging', 'test'),
    PORT: Joi.string().required(),
    SECRETKEY: Joi.string().required(),
    DATABASE_URL: Joi.string().required()
})
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    env: envVars.ENV,
    port: envVars.PORT,
    secretkey: envVars.PORT
};