export const RULES = [
  {
    rule: " Guess the 5-letter word as fast as you can — one puzzle per day.",
    image: "/icons/brain.png",
  },
  {
    rule: "Fastest correct solve of the day wins the ETH prize pool.",
    image: "/icons/timer.png",
  },

  {
    rule: " Join by contributing ETH — your contribution goes into today’s pool.",
    image: "/icons/money.png",
  },
  {
    rule: " One attempt per day — no retries, so think before you guess!.",
    image: "/icons/lock.png",
  },
  {
    rule: " Game resets daily at 12:00 AM UTC with a new word and new pool.",
    image: "/icons/clock.png",
  },
];

export const METAMASK_ERROR_MESSAGE = "Please install MetaMask to continue.";

export const REFRESH_PAGE_TEXT = "Refresh page once MetaMask is installed";

export const NETWORK_ERROR_MESSAGE =
  "Please connect to the Sepolia Test Network";

export const USER_PLAYED_ERROR = "You have already completed today's challenge";

export const USER_PLAYED_DESCRIPTION = (timeInSeconds: any) => {
  return `You completed today's Speedle in ${timeInSeconds} seconds`;
};

export const maskUserAddress = (userAddress: string) => {
  let firstHalf = userAddress.substring(0, 4);
  let secondHalf = userAddress.substring(
    userAddress.length - 3,
    userAddress.length
  );

  return firstHalf + "..." + secondHalf;
};

export const convertTimeToString = (timeInSeconds: number) => {
  if (timeInSeconds === 0) {
    return "0s";
  }

  const hrs = Math.floor(timeInSeconds / 3600);
  const mins = Math.floor((timeInSeconds % 3600) / 60);
  const secs = timeInSeconds % 60;

  const parts = [];

  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0 || hrs > 0) parts.push(`${mins}m`);
  parts.push(`${secs}s`);

  return parts.join(" ");
};

export const getDayOfWeek = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date("2025-07-08");

  return date.getDay()
};

export const  getWeekOfMonth = (startOnMonday = false) =>{
  const date = new Date()
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();

  const firstDayWeekday = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  const offset = startOnMonday
    ? (firstDayWeekday === 0 ? 6 : firstDayWeekday - 1)
    : firstDayWeekday;

  return Math.ceil((dayOfMonth + offset) / 7);
}
