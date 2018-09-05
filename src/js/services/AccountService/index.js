import { generateTransactionRef } from "../../util/util";

const HOST_URL =
  window.location.origin === "https://instachaw.com"
    ? "https://api.instachaw.com"
    : "http://localhost:3333";

class AccountService {
  static processFundingRequest({
    account,
    onFetchTransactionToken,
    handleFetchTransactionToken,
    handleSetFundingAttemptingStatus,
    handleSetTransactionsCount,
    handleFetchTransactionsCount,
    handlesSetUser,
    handleSetFundingModalStatus,
    handleSetupPaymentStatusInterval,
    handleTeardownPaymentStatusInterval
  }) {
    const { fundingMethod, user, transactionsCount, fundingAmount } = account;
    const paymentAddress = "instachaw";
    const self = this;
    var paymentQueryURL = "https://steemconnect.com/sign/transfer?";
    var amount = `${fundingAmount} ${fundingMethod}`;

    if (fundingMethod === "naira") {
      paymentQueryURL = `${HOST_URL}/initializeTransaction`;
      amount = fundingAmount;
    }

    const newWindow = window.open("");

    return handleFetchTransactionToken(function(token, transactionsCount) {
      const memo = `Add ${fundingAmount} ${fundingMethod} to the account of ${user.username}`;
      const redirectQueryString = `amt=${fundingAmount}&wlt=${fundingMethod}&uid=${user.id}&type=topup&memo=${memo}&tkn=${token}`;
      const redirect_uri = `${HOST_URL}/processTransaction?${redirectQueryString}`;
      let paymentQueryString = `to=${paymentAddress}&amount=${amount}&memo=${memo}&redirect_uri=${redirect_uri}`;

      if (fundingMethod === "naira") {
        paymentQueryString = `?ref=${generateTransactionRef()}&${redirectQueryString}&email=${user.email}`;
      }

      newWindow.location = encodeURI(
        `${paymentQueryURL}${paymentQueryString}`.trim()
      );

      handleSetFundingAttemptingStatus({
        isAttemptingFunding: true
      });

      handleSetTransactionsCount({
        transactionsCount
      });

      let oldTransactionsCount = transactionsCount;

      return setTimeout(() => {
        let counter = 0;
        console.log(fundingAmount);

        handleSetupPaymentStatusInterval(() => {
          counter = counter + 1;
          if (counter > 14) {
            handleTeardownPaymentStatusInterval();
          }

          handleFetchTransactionsCount(
            {
              userID: user.id
            },
            newTransactionsCount => {
              if (Number(oldTransactionsCount) < Number(newTransactionsCount)) {
                let wallets = user.wallets.filter(
                  wallet => wallet.title !== fundingMethod
                );

                let newWallet = user.wallets.filter(
                  wallet => wallet.title === fundingMethod
                )[0];

                newWallet.balance = newWallet.balance + fundingAmount;

                wallets = [...wallets, newWallet];

                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    ...user,
                    wallets
                  })
                );

                handlesSetUser({
                  user: {
                    ...user,
                    wallets
                  }
                });

                handleSetFundingModalStatus({
                  isFundingModalOpen: false
                });

                handleSetFundingAttemptingStatus({
                  isAttemptingFunding: false
                });

                handleTeardownPaymentStatusInterval();
              }
            }
          );
        });
      }, 3000);
    });
  }
}

export default AccountService;
