class AccountService {
  static processFundingRequest({
    account,
    onFetchTransactionToken,
    handleFetchTransactionToken,
    handleSetFundingAttemptingStatus,
    handleSetTransactionsCount,
    handleFetchTransactionsCount,
    handleSetUser,
    handleSetFundingModalStatus,
    handleSetupPaymentStatusInterval,
    handleTeardownPaymentStatusInterval
  }) {
    const { fundingMethod, user, transactionsCount, fundingAmount } = account;

    const paymentQueryURL = "https://steemconnect.com/sign/transfer?";
    const paymentAddress = "instachaw";
    const amount = `${fundingAmount} ${fundingMethod}`;
    const self = this;
    const newWindow = window.open("");

    return handleFetchTransactionToken(function(token, transactionsCount) {
      const memo = `Add ${fundingAmount} ${fundingMethod} to the account of ${user.username}`;
      const redirect_uri = `http://localhost:3333/processTransaction?amt=${fundingAmount}&wlt=${fundingMethod}&uid=${user.id}&type=topup&memo=${memo}&tkn=${token}`;
      const paymentQueryString = `to=${paymentAddress}&amount=${amount}&memo=${memo}&redirect_uri=${redirect_uri}`;

      newWindow.location = encodeURI(
        `${paymentQueryURL}${paymentQueryString}`.trim()
      );

      //   newWindow.location = redirect_uri;

      handleSetFundingAttemptingStatus({
        isAttemptingFunding: true
      });

      handleSetTransactionsCount({
        transactionsCount
      });

      let oldTransactionsCount = transactionsCount;

      setTimeout(() => {
        let counter = 0;

        handleSetupPaymentStatusInterval(() => {
          counter = counter + 1;

          if (counter > 10) {
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

                handleSetUser({
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
