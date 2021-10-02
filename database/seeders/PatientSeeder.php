<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Patient::create([
            'nome' => 'Maria Joaquina de Mendonça',
            'data_nascimento' => '1949-06-19',
            'telefone' => '21 6322-5698',
            'tem_comorbidades' => true,
            'vacinado_covid19' => true
        ]);

        Patient::create([
            'nome' => 'Otávio de Oliveira Pinto',
            'data_nascimento' => '1974-12-01',
            'telefone' => '21 6699-8822',
            'tem_comorbidades' => false,
            'vacinado_covid19' => true
        ]);

        Patient::create([
            'nome' => 'Aloísio Malta de Alencar Macedo',
            'data_nascimento' => '1966-08-23',
            'telefone' => '21 6107-8022',
            'tem_comorbidades' => true,
            'vacinado_covid19' => true
        ]);

        Patient::create([
            'nome' => 'Aline Nepomuceno Costa e Silva',
            'data_nascimento' => '2001-08-07',
            'telefone' => '21 6988-0356',
            'tem_comorbidades' => false,
            'vacinado_covid19' => false
        ]);

        Patient::create([
            'nome' => 'Rosemary Azevedo Lins da Silva',
            'data_nascimento' => '1980-11-25',
            'telefone' => '21 6771-4540',
            'tem_comorbidades' => true,
            'vacinado_covid19' => false
        ]);

        Patient::create([
            'nome' => 'Henrique Moreira Salas',
            'data_nascimento' => '1992-09-07',
            'telefone' => '21 7915-7885',
            'tem_comorbidades' => false,
            'vacinado_covid19' => false
        ]);

        Patient::create([
            'nome' => 'Rorberto Casemiro Almeida Nunes',
            'data_nascimento' => '1970-05-11',
            'telefone' => '21 7374-7403',
            'tem_comorbidades' => true,
            'vacinado_covid19' => true
        ]);

        Patient::create([
            'nome' => 'Enzo Rossi Matarazzo',
            'data_nascimento' => '2003-02-28',
            'telefone' => '21 7778-2325',
            'tem_comorbidades' => false,
            'vacinado_covid19' => false
        ]);

        Patient::create([
            'nome' => 'Mayla Zimmer Rockenbach',
            'data_nascimento' => '1989-03-17',
            'telefone' => '21 7152-8963',
            'tem_comorbidades' => false,
            'vacinado_covid19' => false
        ]);

        Patient::create([
            'nome' => 'Alice dos Santos Oliveira',
            'data_nascimento' => '1956-01-06',
            'telefone' => '21 7215-4157',
            'tem_comorbidades' => false,
            'vacinado_covid19' => true
        ]);
    }
}
