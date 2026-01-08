// // lib/azure-keyvault.ts
// import { DefaultAzureCredential } from "@azure/identity";
// import { SecretClient } from "@azure/keyvault-secrets";

// const credential = new DefaultAzureCredential();
// const client = new SecretClient(process.env.VAULT_URL!, credential);

// export async function getSecret(secretName: string): Promise<string | null> {
//   try {
//     const result = await client.getSecret(secretName);
//     if (!result.value)
//       throw new Error(`Secret ${secretName} is empty or missing`);
//     return result.value;
//   } catch (err) {
//     const fallback = process.env.JWT;
//     if (!fallback)
//       throw new Error(
//         `Missing secret ${secretName} in both Key Vault and .env`
//       );
//     console.log(fallback);

//     return fallback;
//   }
// }
