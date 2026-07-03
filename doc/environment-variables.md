# Environment Variables

This project uses [dotenvx](https://dotenvx.com/) to manage environment variables with encryption.

To change the values of environment variables (for any environment), use the
[dotenvx CLI](https://dotenvx.com/docs/cli):

```sh
# Set a variable in .env (encrypted automatically)
pnpm exec dotenvx set FOO 'this is a secret'

# Encrypt a variable for another environment (does not require the private key)
pnpm exec dotenvx set BAR 'production eyes only' -f .env.production

# Set an plain-text value (for non-secrets)
pnpm exec dotenvx set BAZ 'public knowledge' --plain

# Retrieve a value (if you have the .keys file)
pnpm exec dotenvx get QUX -f .env -fk .env.keys

# Retrieve a value (by providing the private key)
DOTENV_PRIVATE_KEY=<private key> pnpm exec dotenvx get FOO

# Get all variables in JSON format
pnpm exec dotenvx get | jq

# Re-encrypt your local .env file, in case your .env.keys was compromised
pnpm exec dotenvx decrypt && tail -n +8 .env > .env.tmp && mv .env.tmp .env && rm .env.keys && pnpm exec dotenvx encrypt
```

See the [CLI Reference](https://dotenvx.com/docs/cli/introduction) for more.
