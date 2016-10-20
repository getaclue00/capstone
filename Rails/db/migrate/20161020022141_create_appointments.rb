class CreateAppointments < ActiveRecord::Migration[5.0]
  def change
    create_table :appointments do |t|
      t.integer :day
      t.integer :month
      t.integer :year
      t.time :start_time
      t.time :end_time
      t.string :status

      t.timestamps
    end
  end
end
