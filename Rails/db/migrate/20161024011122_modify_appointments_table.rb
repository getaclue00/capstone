class ModifyAppointmentsTable < ActiveRecord::Migration[5.0]
  def up
    remove_column :appointments, :day
    remove_column :appointments, :month
    remove_column :appointments, :year
    remove_column :appointments, :start_time
    remove_column :appointments, :end_time
    add_column :appointments, :color, :string, null: false, default: '#AB00FF'
    add_column :appointments, :text_color, :string, null: false, default: '#FFFFFF'
    add_column :appointments, :title, :string, null: false, default: 'New Appointment'
    add_column :appointments, :start, :datetime, null: false, default: '2016-10-23T09:10'
    add_column :appointments, :end, :datetime, null: false, default: '2016-12-31T09:10'
    add_column :appointments, :notes, :text, null: false, default: ''
  end

  def down
    add_column :appointments, :day
    add_column :appointments, :month
    add_column :appointments, :year
    add_column :appointments, :start_time
    add_column :appointments, :end_time
    remove_column :appointments, :color, :string, null: false, default: '#AB00FF'
    remove_column :appointments, :text_color, :string, null: false, default: '#FFFFFF'
    remove_column :appointments, :title, :string, null: false, default: 'New Appointment'
    remove_column :appointments, :start, :datetime, null: false, default: '2016-10-23T09:10'
    remove_column :appointments, :end, :datetime, null: false, default: '2016-12-31T09:10'
    remove_column :appointments, :notes, :text, null: false, default: ''
  end
end
