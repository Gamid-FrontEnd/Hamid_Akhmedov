interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // Pre-calculate the priority for each element, store it, and then use that value for both filtering and sorting.
  // This will reduce the number of getPriority function calls to one per element, making the code more efficient.
  const sortedBalances = useMemo(() => {
    return (
      balances
        .map((balance: WalletBalance) => ({
          ...balance,
          priority: getPriority(balance.blockchain),
        }))
        // The current filtering logic checks for both a priority greater than -99 and an amount less than or equal to 0.
        // If the amount is <= 0, it doesn’t make sense to include it only based on priority.
        .filter((balance) => balance.priority > -99 && balance.amount > 0)
        .sort((lhs, rhs) => rhs.priority - lhs.priority)
    );
  }, [balances]); //useMemo is used to memoize balance filtering and sorting,
  // but the [balances, prices] dependencies include prices, which do not affect the sorting and filtering process.
  // This leads to unnecessary recalculations. It is enough to leave only balances.

  // The getPriority function is called multiple times within the useMemo block—first during filtering and then again during sorting.
  //This results in unnecessary computational overhead.

  //   .filter((balance: WalletBalance) => {
  //     const balancePriority = getPriority(balance.blockchain);
  //     if (lhsPriority > -99) {
  //       if (balance.amount <= 0) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   })
  //   .sort((lhs: WalletBalance, rhs: WalletBalance) => {
  //     const leftPriority = getPriority(lhs.blockchain);
  //     const rightPriority = getPriority(rhs.blockchain);
  //     if (leftPriority > rightPriority) {
  //       return -1;
  //     } else if (rightPriority > leftPriority) {
  //       return 1;
  //     }
  //   });
  //   }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // The rows variable re-maps sortedBalances into FormattedWalletBalance objects,
  // which is redundant since this mapping has already been done in formattedBalances.
  // &
  // The rows variable assumes that sortedBalances contains FormattedWalletBalance objects,
  // but it only holds WalletBalance objects until after formatting.
  // The rows mapping should use formattedBalances instead of sortedBalances.

  // const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  const rows = (balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  };

  // Directly use formattedBalances for rendering the rows.
  return <div {...rest}>{formattedBalances.map(rows)}</div>;
};
