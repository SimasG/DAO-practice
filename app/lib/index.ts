// ** Curiosity: why do I have to export it?
export type proposal = {
    proposalId: number;
    nftTokenId: string;
    deadline: Date;
    yayVotes: string;
    nayVotes: string;
    executed: boolean;
};
