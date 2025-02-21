import * as React from "react";

interface AppContextInterface {
  token: string;
}

export const TokenContext = React.createContext<AppContextInterface | null>(null);

// Provider in your app

// const sampleAppContext: AppContextInterface = {
//   token: "tokenito",
// };

// export function TokenContext() {
//   return (
//     <AppCtx.Provider value={sampleAppContext}>...</AppCtx.Provider>
//   );
// }

// // Consume in your app

// export const PostInfo = () => {
//   const appContext = React.useContext(AppCtx);
//   return (
//     <div>
//       Token: {appContext?.token}
//     </div>
//   );
// };