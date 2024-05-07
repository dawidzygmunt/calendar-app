export const getInitialView = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("view") || "dayGridMonth";
  }
  return "dayGridMonth";
};

export const setInitialView = (view: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("view", view);
  }
};

export const getInitialDate = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("startDate")
      ? new Date(localStorage.getItem("startDate")!)
      : new Date();
  }
  return new Date();
};

export const setInitialDate = (date: Date) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("startDate", date.toISOString());
  }
};
