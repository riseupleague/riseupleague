import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import Image from "next/image";
import vballImg from ".next/static/imgs/img.png"
import logo from ".next/static/imgs/riseup_volleyball.png"

const VballNewsLetter = (): JSX.Element => {
	return (
	<div className="flex flex-wrap justify-center items-start space-x-0">
		<section className="relative font-barlow flex flex-col bg-white px-5 py-12 text-center mx-auto" 
			style={{ width: '720px', height: '1024px', marginRight: '0', marginTop: '30px', marginBottom: '30px' }}>
				<Image src={logo} alt="RiseUp Logo" 
					style={{ width: '187px', height: '187px', position: 'absolute', left: '38px', top: '-4px' }}/>
				
				<h1 style={{ fontSize: '61px', fontWeight: 500, lineHeight: '73px', textAlign: 'left', color: 'black', width: '461px', height: '146px', position: 'absolute', top: '165px', left: '70px' }}>
					OUR NEW WEBSITE IS ON THE WAY.
				</h1>
				
				<p style={{ fontSize: '24px', fontWeight: 400, lineHeight: '36px', textAlign: 'left', color: 'black', width: '461px', height: '36px', position: 'absolute', top: '335px', left: '70px' }}>
					Sign up to be the first to know when we launch!
				</p>
				
				<Input type="text" placeholder="Enter your email"
  					style={{ fontSize: '14 px', fontWeight: '400', lineHeight: '21px', letterSpacing: '0em', textAlign: 'left', color: '#111827', width: '593px', height: '56px', top: '421px', left: '70px', borderRadius: '6px', padding: '16px 0px', paddingLeft: '20px', position: 'absolute' }}/>

				< Button style={{ backgroundColor: '#555B64', position: 'absolute', width: '593px', height: '54px', top: '510px', left: '70px', padding: '16px 48px', border: '1px black', borderRadius: '6px', color: 'white', fontSize: '16px', fontWeight: '600px' }}>
					NOTIFY ME
				</Button>

				{/* <Image src={vballImg} alt="RiseUp Logo" 
					style={{ width: '720px', height: '1024px', position: 'absolute', left: '720px'}}/> */}
		</section>

		<section className="flex-wrap justify-center flex flex-col px-5 py-12 mx-auto" 
			style={{ width: '720px', height: '1024px', marginLeft: '0', marginTop: '30px', marginBottom: '30px', position: 'relative' }}>
				<Image src={vballImg} alt="RiseUp Logo" 
					style={{ width: '720px', height: '1024px', position: 'absolute', left: '0' }}/>
		</section>
	</div>
	);
};

export default VballNewsLetter;
