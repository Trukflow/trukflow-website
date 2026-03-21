type SubscriptionLike = {
  status?: string | null;
  paymentStatus?: string | null;
  endDate?: string | null;
  isActive?: boolean | null;
};

const TRIAL_STATUSES = new Set(["trial", "free_trial"]);

const normalizeStatus = (value?: string | null) => value?.toLowerCase().trim() ?? "";

export const getSubscriptionAccess = (subscription?: SubscriptionLike | null) => {
  if (!subscription) {
    return {
      isEligible: false,
      isTrial: false,
      status: "",
      paymentStatus: "",
      endDate: null as Date | null,
    };
  }

  const status = normalizeStatus(subscription.status);
  const paymentStatus = normalizeStatus(subscription.paymentStatus);
  const endDate = subscription.endDate ? new Date(subscription.endDate) : null;
  const hasFutureEndDate = !!endDate && !Number.isNaN(endDate.getTime()) && endDate.getTime() > Date.now();
  const isTrial = TRIAL_STATUSES.has(status) || TRIAL_STATUSES.has(paymentStatus);

  const isEligible =
    subscription.isActive === true ||
    status === "active" ||
    (isTrial && hasFutureEndDate);

  return {
    isEligible,
    isTrial,
    status,
    paymentStatus,
    endDate,
  };
};
