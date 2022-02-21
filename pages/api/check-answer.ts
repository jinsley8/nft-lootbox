import type { NextApiRequest, NextApiResponse } from "next";
import { ethers, BigNumber } from "ethers";
import { ThirdwebSDK } from "@3rdweb/sdk";
import quizQuestions from "../../lib/questions";
import { packAddress } from "../../lib/contractAddresses";

export type CheckAnswerPayload = {
  address: string;
  questionIndex: number;
  answerIndex: number;
  message: string;
  signedMessage: string;
};

type ErrorResponse = {
  kind: "error";
  error: string;
};

type IncorrectResponse = {
  kind: "incorrect";
  correctAnswerIndex: number;
};

type CorrectResponse = {
  kind: "correct";
};

export type CheckAnswerResponse =
  | ErrorResponse
  | IncorrectResponse
  | CorrectResponse;

export default async function Open(
  req: NextApiRequest,
  res: NextApiResponse<CheckAnswerResponse>
) {
  // Validate the request body contains expected fields
  if (!req.body.hasOwnProperty("questionIndex")) {
    res.status(400).json({
      kind: "error",
      error: "No question index in request body",
    });
    return;
  }

  if (!req.body.hasOwnProperty("answerIndex")) {
    res.status(400).json({
      kind: "error",
      error: "No answer index in request body",
    });
    return;
  }

  const body = req.body as CheckAnswerPayload;

  // get address the signed message
  let address = ""
  try {
    address = ethers.utils.verifyMessage(body.message, body.signedMessage)
  } catch (err) {
    res.status(400).json({
      kind: "error",
      error: `Unable to verify message: ${err}`,
    });
    return;
  }

  // Validate the question index is valid
  if (body.questionIndex >= quizQuestions.length) {
    res.status(400).json({
      kind: "error",
      error: `Invalid question index ${body.questionIndex}`,
    });
    return;
  }

  const question = quizQuestions[body.questionIndex];

  // Check the answer, return if incorrect
  if (body.answerIndex !== question.correctAnswerIndex) {
    res.status(200).json({
      kind: "incorrect",
      correctAnswerIndex: question.correctAnswerIndex as number,
    });
    return;
  }

  // If we get here then the answer was correct
  // Initialize the Thirdweb SDK using the private key that owns the wallet
  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.WALLET_PRIVATE_KEY as string,
      // Using Polygon Mumbai network
      ethers.getDefaultProvider("https://winter-icy-sun.matic-testnet.quiknode.pro/f36aa318f8f806e4e15a58ab4a1b6cb9f9e9d9b9/")
    ),
  );

  // Transfer a copy of the pack to the user
  console.log(`Transferring a pack to ${address}...`);
  const packModule = sdk.getPackModule(packAddress);
  const packTokenId = '0';
  // This is async
  packModule.transfer(address, packTokenId, BigNumber.from(1));

  res.status(200).json({
    kind: "correct",
  });
}
