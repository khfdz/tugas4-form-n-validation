import React from "react";
import * as Validator from 'validatorjs';

const Input = ({Label, type, name, options, onChange, checked}) => {
    if (type === 'select') {
        return (
            <div>
                <label>{Label}: </label>
                <br />
                <select name={name} onChange={e => onChange(e.target.value)}>
                    <option value="">Pilih {Label}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                <br />
            </div>
        );
    } else if (type === 'radio') {
        return (
            <div>
                <label>{Label}: </label>
                <br />
                {options.map((option, index) => (
                    <label key={index}>
                        <input 
                            type={type} 
                            value={option.value} 
                            name={name} 
                            onChange={e => onChange(e.target.value)}
                            checked={checked === option.value}
                        /> {option.label}
                    </label>
                ))}
                <br />
            </div>
        );
    } else {
        return (
            <div>
                <label>{Label}: </label>
                <br />
                <input type={type} name={name} onChange={e => onChange(e.target.value)}/>
                <br />
            </div>
        );
    }
}



const ShowErrors = ({errors}) => {
    return (
        <ul style={{color: 'red', marginLeft: '-20px'}}>
            {
                errors.map((error, i) => <li key={i}>{error}</li>)
            }
        </ul>
    )
}

class Validation extends React.Component {
    state = {
        nama: '',
        gender: '',
        tanggal_lahir: '',
        jurusan: '',
        alamat: '',
        email: '',
        telp: '',
        errors: []
    }

    handleSubmit = event => {
        event.preventDefault();
        const {nama, gender, tanggal_lahir, jurusan, alamat, email, telp} = this.state;

        let data = { nama, gender, tanggal_lahir, jurusan, alamat, email, telp };

        let rules = {
            nama: 'required',
            gender: 'required',
            tanggal_lahir: 'required|date',
            jurusan: 'required',
            alamat: 'required',
            email: 'required|email',
            telp: 'required|numeric'
        }

        let validation = new Validator(data, rules);
        if (validation.passes()) {
            alert(
            `
            Nama: ${nama}\n
            Jenis Kelamin: ${gender}\n
            Tanggal Lahir: ${tanggal_lahir}\n
            Jurusan: ${jurusan}\n
            Email: ${email}\n
            No Telepon: ${telp}\n
            `
            
            );
        } else {
            this.setState({
                errors: [
                    ...validation.errors.get('nama'),
                    ...validation.errors.get('gender'),
                    ...validation.errors.get('tanggal_lahir'),
                    ...validation.errors.get('jurusan'),
                    ...validation.errors.get('alamat'),
                    ...validation.errors.get('email'),
                    ...validation.errors.get('telp')
                ]
            })
        }
    }

    render() {
        const style = {
            width: '400px',
            margin: '100px auto 0',
            border: '1px solid black',
            padding: '10px'
        }

        return (
                <div style={style}>
                {
                    this.state.errors && <ShowErrors errors={this.state.errors} />                
                }
                    <h4>Form Pendaftaran</h4>
                    <form onSubmit={this.handleSubmit}>
                    <Input type="text" name="nama" Label="Nama" onChange={value => this.setState({nama: value})}/>
                    <Input type="radio" name="gender" Label="Jenis Kelamin" options={[{value: 'Laki-Laki', label: 'Laki - Laki'}, {value: 'Perempuan', label: 'Perempuan'}]} onChange={value => this.setState({gender: value})} checked={this.state.gender}/>
                    <Input type="date" name="tanggal_lahir" Label="Tanggal Lahir" onChange={value => this.setState({tanggal_lahir: value})}/>
                    <Input type="select" name="jurusan" Label="Jurusan" options={['Teknik Informatika', 'Sistem Informasi', 'Desain Komunikasi Visual']} onChange={value => this.setState({jurusan: value})}/>
                    <Input type="textarea" name="alamat" Label="Alamat" onChange={value => this.setState({alamat: value})} value={this.state.alamat}/>
                    <Input type="email" name="email" Label="Email" onChange={value => this.setState({email: value})}/>
                    <Input type="number" name="telp" Label="No Telepon" onChange={value => this.setState({telp: value})}/>
                        

                        <br />
                        <button type="submit">Daftar</button>
                    </form>
                </div>
        )
    }
}

export default Validation;
