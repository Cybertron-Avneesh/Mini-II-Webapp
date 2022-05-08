const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Evidence Contract", function () {
	let owner, addr1, addr2;
	let addrs;
	let Evidence;
	let hardhatEvidence;
	const stations = [
		{ name: "ABC Police Chowki", location: "XYZ, Kanpur, UP-202020" },
		{
			name: "DEF Police Station",
			location: "Civil Lines, Allahabad, UP-200002",
		},
		{
			name: "121 Police Chowki",
			location: "Near CityMall, Lucknow, UP-321123",
		},
		{
			name: "Qwerty Police Station",
			location: "Indiana Tower, Delhi, Delhi-909090",
		},
	];
	const dummy_fir = [
		{
			title: "This is FIR for crime of Person XYZ at guava lake",
			desc: "Something loge text goes here which explicitely explains the detail of crime scene. Blah blah blah...",
		},

		{
			title: "Next Crime scene 2",
			desc: "Yet another sentence.Something loge text goes here which explicitely explains the detail of crime scene. Blah blah blah...",
		},
	];
	beforeEach(async function () {
		Evidence = await ethers.getContractFactory("EvidenceContract");
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();

		hardhatEvidence = await Evidence.deploy();
	});

	describe("Deployment", function () {
		it("Should set right owner", async function () {
			expect(await hardhatEvidence.administrator()).to.equal(
				owner.address
			);
		});
		it("Should have empty default values", async function () {
			const numEvidences = await hardhatEvidence.numEvidence();
			const numFir = await hardhatEvidence.numFir();
			const administrator = await hardhatEvidence.administrator();
			const stations = await hardhatEvidence.getAllStations();
			const firs = await hardhatEvidence.getAllFirs();
			console.log({
				owner: owner.address,
				administrator: administrator,
				numEvidences: numEvidences,
				numFir: numFir,
				stations: stations,
				firs: firs,
			});
		});
	});
	describe("Transactions", function () {
		it("Add addr1 and addr2 as policemen", async function () {
			console.log("Addr1", addr1.address, "Addr2", addr2.address);
			await hardhatEvidence.createPolice(addr1.address);
			await hardhatEvidence.createPolice(addr2.address);
			const isAddr1 = await hardhatEvidence.isAuthorised(addr1.address);
			const isAddr2 = await hardhatEvidence.isAuthorised(addr2.address);
			const isAddrs0 = await hardhatEvidence.isAuthorised(
				addrs[0].address
			);
			console.log({
				addr1: isAddr1,
				addr2: isAddr2,
				addrs0: isAddrs0,
			});
			await hardhatEvidence.revokeAccess(addr1.address);
			const isAddr1Still = await hardhatEvidence.isAuthorised(
				addr1.address
			);
			console.log(isAddr1Still);
		});
		it("Add few stations", async function () {
			stations.forEach(async (station) => {
				await hardhatEvidence.createStation(
					station.name,
					station.location
				);
			});
			const loadedStations = await hardhatEvidence.getAllStations();
			console.log("Loaded Stations: ", loadedStations);
		});
		it("Add few FIRs", async function () {
			// add stations
			stations.forEach(async (station) => {
				await hardhatEvidence.createStation(
					station.name,
					station.location
				);
			});

			// add policemen
			await hardhatEvidence.createPolice(addr1.address);
			await hardhatEvidence.createPolice(addr2.address);
			await hardhatEvidence.createPolice(owner.address);

			// create FIR
			dummy_fir.forEach(async (fir) => {
				await hardhatEvidence.createFir(fir.title, fir.desc, 1234, 0);
			});
			// Getting number of FIRs
			const numFir = await hardhatEvidence.numFir();
			console.log("Number of FIRs: ", numFir);
			// get a particular FIR.
			const single_fir = await hardhatEvidence.Firs(0);
			console.log("FIR: ", single_fir);
			// get all FIRs
			const all_firs = await hardhatEvidence.getAllFirs();
			console.log("All FIRs: ", all_firs);

			const txn = await hardhatEvidence.createEvidence("ID", "Title", 0);
			await txn.wait();
			// get a particular FIR.
			const single_fir_2 = await hardhatEvidence.getFir(0);
			console.log("FIR: ", single_fir_2);
		});
	});
});
