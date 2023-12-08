static async calculateWinningResults(lottoTickets) {
const resultWinNum = await LottoStore.askWinningNum();
const resultBonusNum = await LottoStore.askBonusNum();
const winLotto = new WinLotto(resultWinNum, resultBonusNum, lottoTickets);
return winLotto.compareNumbers();
}