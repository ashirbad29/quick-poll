/* eslint-disable no-console */
export default function myLog(...msg: any) {
  if (import.meta.env.DEV) {
    console.log(...msg);
  }
}
