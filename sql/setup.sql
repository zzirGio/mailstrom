-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mailstrom
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mailstrom` ;
USE `mailstrom` ;

-- -----------------------------------------------------
-- Table `mailstrom`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mailstrom`.`User` ;

CREATE TABLE IF NOT EXISTS `mailstrom`.`User` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(45) NOT NULL,
  `PasswordHash` CHAR(60) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `UserName_UNIQUE` (`UserName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mailstrom`.`Contact`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mailstrom`.`Contact` ;

CREATE TABLE IF NOT EXISTS `mailstrom`.`Contact` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Name` VARCHAR(255) NULL,
  `PhoneNumber` CHAR(10) NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Contact_User1_idx` (`UserId` ASC) VISIBLE,
  CONSTRAINT `fk_Contact_User`
    FOREIGN KEY (`UserId`)
    REFERENCES `mailstrom`.`User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mailstrom`.`Message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mailstrom`.`Message` ;

CREATE TABLE IF NOT EXISTS `mailstrom`.`Message` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `ContactId` INT NOT NULL,
  `Content` VARCHAR(160) NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `TimeToBeSent` DATETIME NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Message_User_idx` (`UserId` ASC) VISIBLE,
  INDEX `fk_Message_Contact1_idx` (`ContactId` ASC) VISIBLE,
  CONSTRAINT `fk_Message_User`
    FOREIGN KEY (`UserId`)
    REFERENCES `mailstrom`.`User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Message_Contact`
    FOREIGN KEY (`ContactId`)
    REFERENCES `mailstrom`.`Contact` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mailstrom`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mailstrom`.`Category` ;

CREATE TABLE IF NOT EXISTS `mailstrom`.`Category` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mailstrom`.`MessageTemplate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mailstrom`.`MessageTemplate` ;

CREATE TABLE IF NOT EXISTS `mailstrom`.`MessageTemplate` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `CategoryId` INT NOT NULL,
  `Content` VARCHAR(160) NOT NULL,
  `IsPublic` TINYINT(1) NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_MessageTemplate_User1_idx` (`UserId` ASC) VISIBLE,
  INDEX `fk_MessageTemplate_Category1_idx` (`CategoryId` ASC) VISIBLE,
  CONSTRAINT `fk_MessageTemplate_User`
    FOREIGN KEY (`UserId`)
    REFERENCES `mailstrom`.`User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MessageTemplate_Category`
    FOREIGN KEY (`CategoryId`)
    REFERENCES `mailstrom`.`Category` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
