export const getInitialView = () => {
  return localStorage.getItem("view") || "dayGridMonth";
};

export const setInitialView = (view: string) => {
  localStorage.setItem("view", view);
};

export const getInitialDate = () => {
  return localStorage.getItem("startDate")
    ? new Date(localStorage.getItem("startDate")!)
    : new Date();
};

export const setInitialDate = (date: Date) => {
  localStorage.setItem("startDate", date.toISOString());
};
