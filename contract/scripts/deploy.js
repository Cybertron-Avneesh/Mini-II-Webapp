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

async function main() {
    const dummy_stations = [
        { name: "Police Chowki", location: "XYZ, Kanpur, UP-202020" },
        {
            name: "Police Station",
            location: "Civil Lines, Allahabad, UP-200002",
        },
        {
            name: "Apache Police Chowki",
            location: "Near CityMall, Lucknow, UP-321123",
        },
        {
            name: "Indiana Police Station",
            location: "Indiana Tower, Delhi, Delhi-909090",
        }
    ];
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);

	console.log("Account balance:", (await deployer.getBalance()).toString());

	const Evidence = await ethers.getContractFactory("EvidenceContract");
	const hardhatEvidence = await Evidence.deploy();

	console.log("Contract Address address:", hardhatEvidence.address);
	
    let txn;
    // add deployed account as policement
	txn = await hardhatEvidence.createPolice(deployer.address);
    await txn.wait();
	const isDeployerAddedAsPolicemen = await hardhatEvidence.isAuthorised(
		deployer.address
	);
	console.log("Deployer added as Policemen:", isDeployerAddedAsPolicemen);

	// add dummy stations
	dummy_stations.forEach(async function (station) {
        console.log("Station creation started...");
        const res = await hardhatEvidence.createStation(
            station.name,
            station.location
        );
        console.log("Creation over: ",res);
    });
    const loadedStations = await hardhatEvidence.getAllStations();
    console.log("Loaded Stations: ", loadedStations);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
