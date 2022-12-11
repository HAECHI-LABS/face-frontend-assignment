import { ethers } from "ethers";
import { logger } from "../src/logger";

logger.info("hi");
logger.info(ethers.Wallet.createRandom().privateKey);
