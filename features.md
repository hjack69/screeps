Roles:
	Builder:
		Enters queue when energy is empty, builds at construction sites when filled
		Building priority: Walls >> !Roads >> Anything
		Defaults to Maintainer
		Swarm in Emergency
		Body: WORK x2, CARRY x1, MOVE x1; 300e
	Claimer:
		Currently needs explicit directions on where to go and what to do, configurable in role file
		Swarm in Emergency
		Body: CLAIM x1, ATTACKx1, MOVE x2; 730e
	Defender:
		Looks for hostile creeps, attacks if found, moves out of the way if not found
		Continues in Emergency
		Body: TOUGHx3, ATTACK x3, MOVE x4; 470e
	Energy Miner:
		Harvests energy from source, repairs dumping container if needed, dumps energy into nearby container
		Requires container id and harvesting spot in creep memory
		Continues in Emergency
		Body: WORK x4, CARRY x1, MOVE x1; 800e
	Harvester:
		**depreciated** kept for legacy, see spawner
		Body: 
	Healer:
		Searches for any injured creep, heals if found, gets out of the way otherwise
		Continues in Emergency
		Body: HEAL x2, MOVEx3; 650e
	Hoarder:
		***depreciated***
		Swarms in Emergency
		Body: 
	Maintainer:
		Finds structures with low hits and repairs them
		Repair priority: Containers, Roads, Towers half hits >> Containers, Roads, Towers less than full
		Defaults to Tower Filler
		Swarms in Emergency
		Body: WORK x1, CARRY x1, MOVE x1; 200e
	Mover:
		Moves energy from source containers to other containers, attempts to speed up upgrading a bit
		Defaults to Upgrader
		Swarms in Emergency
		Body: WORK x1, CARRY x2, MOVE x2; 300e
	Paver:
		Constructs Roads only
		Defaults to Builder
		Swarms in Emergency
		Body: WORK x1, CARRY x1, MOVE x1; 200e
    Scruffy:
        He's Scruffy, the janitor.
        Picks up dropped resources (currently just energy, will add other resources when mining is implemented)
        Defaults to maintainer
        body: WORKx1, CARRYx2, MOVEx2; 300e
	Spawner:
		Powers the spawner and extensions
		Defaults to Mover
		Continues in Emergency
		Body: CARRY x3, MOVE x3; 300e
	Tower Filler:
		Powers the Towers
		Defaults to Mover
		Continues in Emergency
		Body: WORK x1, CARRY x2, MOVE x2; 300e 
	Upgrader:
		Upgrades the controller, can take power from nearby containers before entering queue
		Continues in Emergency
		Body: WORK x3, CARRY x1, MOVE x1; 400e
	Wall Maintainer:
		Repairs Walls and Ramparts
		Repair priority: less than 500k >> less than half >> less than full
		Defaults to Maintainer
		Continues in Emergency
		Body: WORK x1, CARRY x2, MOVE x2; 300e



NOTES:

    I noticed Scruffy trying to pick up dropped resources from containers. Checked in the console and everytime a creep was transferring energy to a container, it would show up in a FIND_DROPPED_ENERGY search. Could be a bug -- might update the code to filter out any dropped energy that's directly on top of a container or something like that... 